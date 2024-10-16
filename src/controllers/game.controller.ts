import {Body, Controller, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import {CreateGameDTO, GameDTO, UpdateGameDTO} from "../dto/game.dto";
import { gameService } from "../services/game.service";
import {notFound} from "../error/NotFoundError";
import {ConsoleDTO} from "../dto/console.dto";
import {consoleService} from "../services/console.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  // Récupère un jeu par ID
  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<GameDTO | null> {
    const console = await gameService.getGameById(id);
    if (!console) {
      notFound("Console");
    } else {
      return console;
    }
  }

  // Crée un nouveau jeu
  @Post("/")
  public async addGame(@Body() requestBody: CreateGameDTO): Promise<GameDTO> {
    const createdGame = await gameService.createGame(requestBody);
    if (!createdGame) {
      throw new Error("Failed to add game");
    }
    return createdGame;
  }

  @Patch("{id}")
  public async updateGame(
      @Path() id: number,
      @Body() requestBody: UpdateGameDTO
  ): Promise<GameDTO | null> {
    const {title, console} = requestBody;
    const updatedConsole = await gameService.updateGame(id, title, console);
    if (!updatedConsole) {
      notFound("Update does not occur. Game");
    } else {
      return updatedConsole;
    }
  }
}