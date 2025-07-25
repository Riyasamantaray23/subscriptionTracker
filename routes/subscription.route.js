import express from 'express';
import { verifyAccessToken } from '../middleware/auth.middleware.js';
const subscriptionRouter = express.Router();
import {createSubscription, getAllSubscriptions, getSubscription, deleteSubscription } from '../controllers/subscriptions.controller.js';

subscriptionRouter.get('/', verifyAccessToken, getAllSubscriptions);

subscriptionRouter.get('/:id',verifyAccessToken, getSubscription);

subscriptionRouter.post('/',verifyAccessToken, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send('Update subscription');
});

subscriptionRouter.delete('/:id',verifyAccessToken, deleteSubscription );

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send('Get all user subscription');
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send('Cancel subscription');
});

subscriptionRouter.get('/:id/upcoming-renewals', (req, res) => {
    res.send('Get upcoming renewals');
});

export default subscriptionRouter;
