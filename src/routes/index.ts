import { Rekognition } from "aws-sdk";
import { NextFunction, Request, Response, Router } from "express";
import { decode as base64decode } from 'base64-arraybuffer'
import rekognition from "../aws";

const routes = Router();

routes.post('/aws-request', (
    request: Request<unknown ,unknown ,{img1: string; img2: string;}>,
    response: Response,
  ) => {
    const { img1, img2 } = request.body;
    const params: Rekognition.CompareFacesRequest = {
      SourceImage: {
        Bytes: base64decode(img1),
      },
      TargetImage: {
        Bytes: base64decode(img2),
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
        }
      }
    );
  });

export default routes;
