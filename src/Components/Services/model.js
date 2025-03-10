import axios from "axios";

export class ModelServices {
    tickers = [];

    constructor() {
        const localData = localStorage.getItem("tickers");
        this.tickers = localData ? JSON.parse(localData) : [];
    }

    async getPrediction() {
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", { tickers: this.tickers });

            if (response.status === 200) {
                return response.data;
                console.log(response.data);
            }
        } catch (err) {
            console.error("Error in fetching model data:", err);
        }

        return null;
    }

    async  getSearchPrediction(input) {
        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", { tickers:[input]  });

            if (response.status === 200) {
                return response.data;
            }
        } catch (err) {
            console.error("Error in fetching search prediction:", err);
        }

        return null;
    }
}


export default ModelServices;
