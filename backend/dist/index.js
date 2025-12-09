"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/category"));
const circle_1 = __importDefault(require("./routes/circle"));
const post_1 = __importDefault(require("./routes/post"));
const userCircle_1 = __importDefault(require("./routes/userCircle"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ message: 'Inner Circle API is running!' });
});
app.use('/api', auth_1.default);
app.use('/api/categories', category_1.default);
app.use('/api/circles', circle_1.default);
app.use('/api/posts', post_1.default);
app.use('/api/user-circles', userCircle_1.default);
app.use('/api/users', users_1.default);
app.listen(port, () => {
    console.log(`Redo på den externa servern på: ${port}`);
});
