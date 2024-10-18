import {Game} from "../models/game.model";
import {Review} from "../models/review.model";
import {ReviewDTO} from "../dto/review.dto";


export class ReviewService {

    // Questions sautées dû au retard causé par l'absence
    public static async deleteReview(id: number): Promise<void> {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new Error("Review not found");
        }
        await review.destroy();
    }

    static async getGameReviews(idGame: number): Promise<ReviewDTO[]> {
        return await Review.findAll({ where: { game_id: idGame } });
    }

}