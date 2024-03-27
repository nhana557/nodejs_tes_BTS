import express from 'express';
import app from './app.js';
import mainConnection from './database/connections/mainConnection.js';

mainConnection();
app(express);
