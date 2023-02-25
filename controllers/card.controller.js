const { Card, List } = require('../model');
const { statusCodesEnum } = require('../configs');

module.exports = {
    getAllCard: async (req, res, next) => {
        try {
            const cards = await Card.find();

            res.status(statusCodesEnum.OK)
                .json(cards);
        } catch (e) {
            next(e);
        }
    },
    createCard: async (req, res, next) => {
        try {
            const { title, listId } = req.body;

            const createdCard = await Card.create({ title, listId });

            await List.findOneAndUpdate(
                { _id: listId },
                { $push: { cards: createdCard._id } }
            );

            res
                .status(statusCodesEnum.CREATED)
                .json(createdCard);
        } catch (e) {
            next(e);
        }
    },
    deleteCard: async (req, res, next) => {
        try {
            const { cardId } = req.params;

            await Card.findByIdAndDelete(cardId);

            res
                .status(statusCodesEnum.NO_CONTENT)
                .json(`${ cardId } is deleted`);
        } catch (e) {
            next(e);
        }
    },
    updateCard: async (req, res, next) => {
        try {
            const { title, listId } = req.body;
            const { cardId } = req.params;

            const updatedCard = await Card
                .findOneAndUpdate(
                    { id_: cardId },
                    { $set: { title } }
                );

            if (listId) {
                const previousCardListId = updatedCard.listId;

                await List.findByIdAndUpdate(previousCardListId, {
                    $pull: { cards: cardId }
                });

                await List.findByIdAndUpdate(listId, {
                    $set: { cards: cardId }
                });

                updatedCard.listId = listId;

                await updatedCard.save();
            }

            res
                .status(statusCodesEnum.OK)
                .json(updatedCard);
        } catch (e) {
            next(e);
        }
    },
};
