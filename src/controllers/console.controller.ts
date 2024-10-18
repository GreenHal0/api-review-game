import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { consoleService } from "../services/console.service";
import { ConsoleDTO } from "../dto/console.dto";
import {notFound} from "../error/NotFoundError";
import {GameService} from "../services/game.service";
import {ReviewService} from "../services/review.service";
import {ReviewController} from "./review.controller";
import {GameController} from "./game.controller";
import {GameDTO} from "../dto/game.dto";

@Route("consoles")
@Tags("Consoles")
export class ConsoleController extends Controller {
  // Récupère toutes les consoles
  @Get("/")
  public async getAllConsole(): Promise<ConsoleDTO[]> {
    return consoleService.getAllConsoles();
  }

  // Récupère une console par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<ConsoleDTO | null> {
    const console = await consoleService.getConsoleById(id);
    if (!console) {
      notFound("Console");
    } else {
      return console;
    }
  }

  // Crée une nouvelle console
  @Post("/")
  public async createConsole(
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO> {
    const { name, manufacturer } = requestBody;
    return consoleService.createConsole(name, manufacturer);
  }

  // Supprime une console par ID si elle n'a pas de review
  @Delete("{id}")
  public async deleteConsole(@Path() id: number): Promise<void> {
    const consoleGames = await GameService.getConsoleGames(id);

    for (const game of consoleGames) {
      const gameReviews = await ReviewService.getGameReviews(game.id ? game.id : -1);
      if (gameReviews.length > 0) {
        throw new Error("One or more game of this console still have reviews. Delete them first.");
      }
    }
    await consoleService.deleteConsole(id);
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateConsole(
    @Path() id: number,
    @Body() requestBody: ConsoleDTO
  ): Promise<ConsoleDTO | null> {
    const {name, manufacturer} = requestBody;
    const updatedConsole = await consoleService.updateConsole(id, name, manufacturer);
    if (!updatedConsole) {
      notFound("Update does not occur. Console");
    } else {
      return updatedConsole;
    }
  }

  // Récupère les jeux liés à la console
  @Get("{id}/games")
  public async getConsoleGames(
      @Path() id: number
  ): Promise<GameDTO[]> {
    return GameService.getConsoleGames(id);
  }
}
