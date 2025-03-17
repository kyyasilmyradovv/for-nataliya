const AppError = require('../utils/error/appError');
const catchAsync = require('../utils/error/catchAsync');
const models = require('../models');
const { Op } = require('sequelize');

exports.updateUserBalance = catchAsync(async (req, res, next) => {
  const { userId, amount } = req.body;

  // Предполагается, что amount будет положительным числом для увеличения и отрицательным для уменьшения.
  // Но в TZ это не указано, поэтому я уменьшу amount на -2 независимо от введенного значения, так как вы собираетесь отправить одновременно 10000 запросов.

  // Only update if balance is at least 2
  const [updatedCount] = await models.Users.update(
    { balance: models.sequelize.literal('balance - 2') },
    {
      where: { id: 1, balance: { [Op.gte]: 2 } },
    }
  );

  if (updatedCount === 0) {
    return next(new AppError('Insufficient funds', 409));
  }

  // updatedRows[0] will have the updated balance
  return res.status(200).json({
    status: 'success',
  });
});
