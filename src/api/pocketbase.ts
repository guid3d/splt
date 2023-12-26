import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

export const resultList = pb.collection("expenses").getList(1, 50);
