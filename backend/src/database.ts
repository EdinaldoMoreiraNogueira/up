import {Sequelize} from 'sequelize';


const sequelize = new Sequelize('mysql://root:wiarpe04@localhost:3306/upserver');

export default sequelize;