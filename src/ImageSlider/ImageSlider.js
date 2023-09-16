import { useState } from "react";
import "./styles.css";

export default function App() {
  const [activeView, setActiveView] = useState(0);

  const linearNav = (moveFlag, navHandler, currentView, assetCount) => {
    if (moveFlag > 0) {
      if (currentView === assetCount - 1) {
        navHandler(0);
      } else {
        navHandler(currentView + 1);
      }
    } else {
      if (currentView === 0) {
        navHandler(assetCount - 1);
      } else {
        navHandler(currentView - 1);
      }
    }
  };

  const navHandler = (currentView) => setActiveView(currentView);

  return (
    <div className="App">
      <h1>IMAGE SLIDER</h1>
      <div className="preview-container">
        <ArrowElements
          linearNav={linearNav}
          navHandler={navHandler}
          currentView={activeView}
          assetCount={slideAssets.length}
        />
        <PreviewAssets assets={slideAssets} active={activeView} />
      </div>
      <div className="navigation">
        <NavElement
          assetCount={slideAssets.length}
          active={activeView}
          navHandler={navHandler}
        />
      </div>
    </div>
  );
}

const ArrowElements = ({ linearNav, navHandler, currentView, assetCount }) => {
  return (
    <div className="arrow-elements">
      <div onClick={() => linearNav(-1, navHandler, currentView, assetCount)}>
        &lt;
      </div>
      <div onClick={() => linearNav(1, navHandler, currentView, assetCount)}>
        &gt;
      </div>
    </div>
  );
};

const PreviewAssets = ({ assets, active }) => {
  return assets?.map((asset, idx) => {
    if (idx === active) {
      return (
        <>
          <img
            key={asset.caption}
            src={asset.src}
            alt={asset.caption}
            className={idx === active ? "active" : ""}
          />
          <span className="image-caption">{asset.caption}</span>
        </>
      );
    }
    return null;
  });
};

const linearNav = (moveFlag, navHandler, currentView, assetCount) => {
  if (moveFlag > 0) {
    if (currentView === assetCount - 1) {
      navHandler(0);
    } else {
      navHandler(currentView + 1);
    }
  } else {
    if (currentView === 0) {
      navHandler(assetCount - 1);
    } else {
      navHandler(currentView - 1);
    }
  }
};

const NavElement = ({ assetCount, active, navHandler }) => {
  const navItemArr = [];
  for (let i = 0; i < assetCount; i++) {
    navItemArr.push(
      <BtnElement
        customCls={i === active ? "active" : ""}
        navHandler={navHandler}
        activeIdx={i}
      />
    );
  }
  return navItemArr;
};

const BtnElement = ({ customCls, navHandler, activeIdx }) => {
  return (
    <div
      className={`btn-element ${customCls}`}
      onClick={() => navHandler(activeIdx)}
    />
  );
};

const slideAssets = [
  {
    src: "https://cdn.pixabay.com/photo/2023/09/13/17/17/sea-8251349_640.jpg",
    caption: "near the cliff"
  },
  {
    src:
      "https://cdn.pixabay.com/photo/2023/09/09/08/57/mountain-8242717_640.jpg",
    caption: "let's summit"
  },
  {
    src:
      "https://cdn.pixabay.com/photo/2023/09/10/17/30/mushroom-8245396_640.jpg",
    caption: "resting mushroom"
  },
  {
    src:
      "https://cdn.pixabay.com/photo/2023/09/11/08/32/squirrel-8246334_640.png",
    caption: "squirrel lifting weights"
  }
];
