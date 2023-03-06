import { Rekognition } from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";
import { decode as base64decode } from 'base64-arraybuffer'
import rekognition from "../aws";
import { img2 } from "./imgs";

const routes = Router();

routes.post('/aws-request', (
    request: Request<unknown, unknown, {img: string;}>,
    response: Response,
  ) => {
    const { img } = request.body;

    const face1 = base64decode(img);
    const face2 = base64decode(img2);
    
    const params: Rekognition.CompareFacesRequest = {
      SourceImage: {
        Bytes: face1,
      },
      TargetImage: {
        Bytes: face2,
      },
      SimilarityThreshold: 90,
    };

    rekognition.compareFaces(
      params,
      (erro, dados) => {
        if (erro) {
          console.log(`ERRO COMPAREFACES: ${erro}`);
          console.log(`STACK: ${erro.stack}`);
        } else {
          console.log(dados);
          response.status(200).send(dados)
        }
      }
    );
  });

export default routes;
