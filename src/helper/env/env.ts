import * as dotenv from 'dotenv'

export const getEnv = () => {
    console.log("Environment to run test= "+ process.env.ENV);
    if (process.env.ENV) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        })
    } else {
        console.error("NO ENV PASSED!")
    }

}