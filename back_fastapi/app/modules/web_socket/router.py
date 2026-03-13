from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends

from app.modules.web_socket.manager import ConnectionManager

router = APIRouter(prefix="/ws", tags=["WebSockets"])
manager = ConnectionManager()

@router.websocket("/updates")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            _ = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)