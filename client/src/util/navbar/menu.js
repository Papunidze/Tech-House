import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CodeIcon from "@mui/icons-material/Code";
import { Link } from "react-router-dom";
export default function menu() {
  return (
    <>
      <Link to={"/"} className="navbar-btn">
        <button>
          <HomeIcon color="secondary" />
          <label>Home</label>
        </button>
      </Link>
      <Link to={"/post"} className="navbar-btn">
        <button>
          <PostAddIcon color="secondary" />
          <label>Post</label>
        </button>
      </Link>
      <Link to={"/question"} className="navbar-btn">
        <button>
          <HelpCenterIcon color="secondary" />
          <label>Faq</label>
        </button>
      </Link>
      <Link to={"/code"} className="navbar-btn">
        <button>
          <CodeIcon color="secondary" />
          <label>Code</label>
        </button>
      </Link>
      <Link to={"/learning"} className="navbar-btn">
        <button>
          <LightbulbIcon color="secondary" />
          <label>Learning</label>
        </button>
      </Link>
    </>
  );
}
