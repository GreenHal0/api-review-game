import {Controller, Delete, Get, Route, Tags} from "tsoa";
import {GameDTO} from "../dto/game.dto";
import {gameService} from "../services/game.service";
import {ReviewService} from "../services/review.service";
import {Review} from "../models/review.model";
import {ReviewDTO} from "../dto/review.dto";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {

    // Questions sautées dû au retard causé par l'absence
    @Delete("{id}")
    public async deleteReview(id: number): Promise<void> {
        return ReviewService.deleteReview(id);
    }

}
