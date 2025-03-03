from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class StoryRequest(BaseModel):
    theme: str

@app.post("/generate-story")
async def generate_story(request: StoryRequest):
    story = f"Once upon a time in a magical land, a {request.theme} started an adventure..."
    return {"story": story}

