import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('msql://root:naldo@localhost:3606/up');

export default sequelize;