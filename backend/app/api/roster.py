from fastapi import APIRouter

from app.models.schemas import Player, RosterResponse


router = APIRouter(prefix="/roster", tags=["roster"])


LOL_PLAYERS = [
    Player(id="lol-1", game="lol", role="Top Laner", nickname="이동영", real_name="Lee Dong-young", role_icon="/Image/LOL/Top.svg"),
    Player(id="lol-2", game="lol", role="Jungler", nickname="황신한", real_name="Hwang Shin-han", role_icon="/Image/LOL/JGL.svg"),
    Player(id="lol-3", game="lol", role="Mid Laner", nickname="김민서", real_name="Kim Min-seo", role_icon="/Image/LOL/MID.svg"),
    Player(id="lol-4", game="lol", role="Bot Laner (ADC)", nickname="이주형", real_name="Lee Ju-hyung", role_icon="/Image/LOL/BOT.svg"),
    Player(id="lol-5", game="lol", role="Support", nickname="김범진", real_name="Kim Beom-jin", role_icon="/Image/LOL/SPT.svg"),
]

VALORANT_PLAYERS = [
    Player(id="val-1", game="valorant", role="Controller · IGL", nickname="이정민", real_name="Lee Jeong-min", role_icon="/Image/VAL/Controller.svg"),
    Player(id="val-2", game="valorant", role="Duelist", nickname="이주형", real_name="Lee Ju-hyung", role_icon="/Image/VAL/Duelist.svg"),
    Player(id="val-3", game="valorant", role="Sentinel", nickname="김범진", real_name="Kim Beom-jin", role_icon="/Image/VAL/Sentinel.svg"),
]


@router.get("", response_model=RosterResponse)
async def get_roster() -> RosterResponse:
    return RosterResponse(lol=LOL_PLAYERS, valorant=VALORANT_PLAYERS)
