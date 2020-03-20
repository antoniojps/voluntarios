import databaseConnection from './database';
import jwtParser from './jwt';

const middlewareHandler = handler => databaseConnection(jwtParser(handler));

export default middlewareHandler;
