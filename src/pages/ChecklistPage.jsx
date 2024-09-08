import Card from "../components/Card.jsx";
import { useRef, useState } from "react";
import AddCard from "../components/AddCard.jsx";
import NavBar from "../components/NavBar.jsx";

/**
 * Represents a page that contains all checklists in a given space.
 * @return {JSX.Element} Checklists page
 */
export default function ChecklistPage() {
  const [blur, setBlur] = useState(false);
  const currentCard = useRef(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [addCard, setAddCard] = useState(false);

  /**
   * Event that occurs when the user expands a card
   * @param event
   */
  const expand = (event) => {
    setBlur(true);
    currentCard.current = event.target;

    const title = currentCard.current.querySelector("h2").textContent;
    const description =
      currentCard.current.querySelectorAll("p")[1].textContent;
    const location = currentCard.current.querySelectorAll("p")[0].textContent;

    // TODO: Extract the whole array of images out of here
    const allImages = currentCard.current.querySelectorAll("img");
    const images = allImages[1] ? [allImages[1].src] : [];

    setExpandedCard({ title, description, location, images });
  };

  const minimize = () => {
    setExpandedCard(null);
    setAddCard(false);
    setBlur(false);
  };

  const pushCards = (event) => {
    event.target.style.marginBottom = "6.7rem";
  };
  const resetMargin = (event) => {
    event.target.style.marginBottom = null;
  };

  return (
    <div className="bg-dark-purple min-h-screen p-8">
      <NavBar />
      {addCard && (
        <AddCard
          expand={true}
          style={{
            backgroundColor: "#D48AE0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            minWidth: "70vw",
          }}
        />
      )}
      {expandedCard !== null && (
        <Card
          title={expandedCard.title}
          description={expandedCard.description}
          location={expandedCard.location}
          images={expandedCard.images}
          style={{
            backgroundColor: "#D48AE0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            minWidth: "60vw",
          }}
          expand={true}
        />
      )}
      <div
        className={`checklists-container ${blur && "blur"}`}
        onClick={blur ? minimize : undefined}
      >
        <div className="header">
          <h1 className="font-title p-4">Person1 and Person2&apos;s Checklist</h1>
          <h4 className="pl-10 pt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            pulvinar, justo non fringilla mollis, lacus nibh.
          </h4>
          <div className="text-sm flex pt-8">
            <div className="text-dark-purple relative w-28 h-auto text-center duration-300 cursor-pointer z-10">
              <p className="tab-text absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                Incomplete
              </p>
              <img
                src="src/assets/incomplete-tab.svg"
                alt="incomplete-tab-image"
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className="text-white relative w-28 h-auto -left-8 text-center duration-300 cursor-pointer z-0">
              <p className="tab-text absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                Complete
              </p>
              <img
                src="src/assets/complete-tab.svg"
                alt="complete-tab-img"
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
        <div
          className="checklists mt-14 grid grid-cols-1 gap-4 md:grid-cols-3"
          style={blur ? { pointerEvents: "none" } : { pointerEvents: "auto" }}
        >
          <div className="checklist">
            {/* Checklist1 map */}
            <h2 className="text-center">Activities</h2>
            <div className="card-group" id="group-1">
              <AddCard
                onClick={() => {
                  setAddCard(true);
                  setBlur(true);
                }}
                expand={false}
              />
              <Card
                title="Exploring Chicago"
                description="Chicago has a lot to offer! We should check out the Millennium Park, explore with the L, and go by the waterfront."
                location="Chicago, IL"
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                images={["src/assets/chicago.jpg"]}
                expand={false}
              />
              <Card
                title="Skydiving in Natick"
                id="card2"
                description="Let's go skydiving in Natick, Massachusetts!"
                location="Natick, MA"
                expand={false}
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
              />
              <Card
                title="Navigating Los Angeles"
                id="card3"
                description="Los Angeles has a lot to do! We can check out Griffith Park, enjoy the waves of Santa Monica beach, surf the Palisades, or grab some food in Little Tokyo!"
                location="Los Angeles, CA"
                expand={false}
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
              />
            </div>
          </div>
          <div className="checklist">
            {/* Checklist2 map */}
            <h2 className="text-center">To Eat</h2>
            <div className="card-group" id="group-2">
              <AddCard
                onClick={() => {
                  setAddCard(true);
                  setBlur(true);
                }}
                expand={false}
              />
              <Card
                title="Chinchikurin"
                description="Delicious Okonomiyaki food!"
                location="Little Tokyo, LA"
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                expand={false}
              />
              <Card
                title="Philippe's The Original"
                description="Let's get some French dip sandwiches!"
                location="Los Angeles, CA"
                front={true}
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                expand={false}
              />
            </div>
          </div>
          <div className="checklist">
            {/* Checklist3 map */}
            <h2 className="text-center">To Watch</h2>
            <div className="card-group" id="group-3">
              <AddCard
                onClick={() => {
                  setAddCard(true);
                  setBlur(true);
                }}
                expand={false}
              />
              <Card
                title="American Fiction"
                description="This new movie was interesting - person1"
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                expand={false}
              />
              <Card
                title="Sleepless in Seattle"
                description="Romantic comedy!"
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                expand={false}
              />
              <Card
                title="2001: A Space Odyssey"
                description="Stanley Kubrik made this film in 1960, and its effects hold up well! The film is known for its beautiful cinematography and soundtrack!"
                front={true}
                onClick={expand}
                onHover={pushCards}
                onLeave={resetMargin}
                expand={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}