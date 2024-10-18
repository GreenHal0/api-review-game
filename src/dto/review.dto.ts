import { GameDTO } from "./game.dto";
import {ConsoleDTO} from "./console.dto";

export interface ReviewDTO {
    id?: number;
    game?: GameDTO;
    rating?: number;
    reviewText?: string;
}