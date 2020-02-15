import AbstractRepository from "./AbstractRepository";
import axios from "axios";

// TODO add refresh token for application
axios.interceptors.response.use(config => config);

class ApplicationRepository extends AbstractRepository {

    protected getAuthorization(): string {
        return "Bearer base64token";
    }
}