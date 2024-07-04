class ConnectionService {
  constructor() {}

  async getAllConnenctions() {
    try {
      const { data } = await axios.get("/connection/");

      if (data) {
        const { connections } = data;
        return connections;
      } else {
        return [];
      }
    } catch (error) {
      console.log("could not able get any connection details!", "error");
    }
  }
}

export const connectionService = new ConnectionService();
