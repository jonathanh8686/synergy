import { Socket } from "socket.io-client";

class GameService {
    public async joinGameRoom(socket: Socket, roomID: string): Promise<boolean> {
        return new Promise((rs, rj) => {
            socket.emit("join_room", {
                "roomID": roomID
            });

            socket.on("join_room_response", (res) => {
                if(!("result" in res)) rj("Invalid response object! Requires result field");
                if(res["result"] == "success") {
                    rs(true);
                } else {
                    if(!("reason" in res)) {
                        rj("Invalid response object! Requires reason field");
                    } else {
                        rj("Error joining room: " + res["reason"]);
                    }
                }
            });

        });
    }

}

export default new GameService();