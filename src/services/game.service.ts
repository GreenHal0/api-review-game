import {CreateGameDTO, GameDTO} from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {consoleService} from "./console.service";
import {notFound} from "../error/NotFoundError";
import { Logger } from '@nestjs/common';

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  // Récupère un jeu par ID
  public async getGameById(id: number): Promise<Game | null> {
    return Game.findByPk(id);
  }

  // Crée un nouveau jeu
  public async createGame(game: CreateGameDTO): Promise<Game| null> {
    if (!game.console) throw new Error("Console is required");

    const consoleExists = (await consoleService.getAllConsoles()).some(console => console.id === game.console);
    if (!consoleExists) return null;

    return await Game.create({title: game.title, console_id: game.console});
  }

  public async updateGame(
      id: number,
      title?: string,
      console?: number
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    const gameConsole = await Console.findByPk(console);
    if (!game) {
      notFound("Game");
    }
    else if (console) {
      if (!gameConsole) notFound("Console specified");
    }
    if (title) game.title = title;
    if (console) game.console_id = console;
    await game.save();
    return game;
  }

  static async getConsoleGames(idConsole: number) {
    return await Game.findAll({ where: { console_id: idConsole } });
  }
}

export const gameService = new GameService();
