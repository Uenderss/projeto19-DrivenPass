import { Request, Response } from "express";

import cardService from "../services/cardService";

export async function insertCard(req: Request, res: Response) {
    const { user } = res.locals;
    const card = req.body;

    await cardService.insertCard(user.id, card);
    res.sendStatus(201);
}
export async function findCard(req: Request, res: Response) {

    const { user } = res.locals;
    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
        res.sendStatus(422); 
    }

    const card = await cardService.findCard(user.id, cardId);
    res.send(card);
}

export async function findAllCards(req: Request, res: Response) {
    const { user } = res.locals;
    const cards = await cardService.findAllCards(user.id);

    res.send(cards);
}

export async function deleteCard(req: Request, res: Response) {

    const cardId = parseInt(req.params.id);
    if (isNaN(cardId)) {
        res.sendStatus(422); 
    }

    const { user } = res.locals;
    await cardService.deleteCard(user, cardId);
    res.sendStatus(200);
}