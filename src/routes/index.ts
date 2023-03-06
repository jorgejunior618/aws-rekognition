import { Rekognition } from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";
import { decode as base64decode } from 'base64-arraybuffer'
import rekognition from "../aws";
import { img2 } from "./imgs"; // Imagem salva para comparação

const routes = Router();

routes.post('/aws-request', (
    request: Request<unknown, unknown, {img: string;}>,
    response: Response,
  ) => {
    const { img } = request.body; // Recebendo a imagem pela requisição

    // Codificando as imagens em Base64 para ArrayBuffer
    const face1 = base64decode(img);
    const face2 = base64decode(img2);

    // Objeto padrao para envio das imagens para comparação na AWS
    const params: Rekognition.CompareFacesRequest = {
      SourceImage: {
        Bytes: face1,
      },
      TargetImage: {
        Bytes: face2,
      },
      SimilarityThreshold: 90,
    };

    // Função do SDK para comparação de Rostos
    rekognition.compareFaces(
      params,
      (erro, dados) => {
        if (erro) {
          console.log(`ERRO COMPAREFACES: ${erro}`);
          console.log(`STACK: ${erro.stack}`);
        } else {
          console.log(dados);
          response.status(200).send(dados); // Devolvendo o resultado da requisição
        }
      }
    );
  });

export default routes;
