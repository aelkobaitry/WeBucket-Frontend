/**
 * Represents a page that contains all checklists in a given space.
 * @return {JSX.Element} Checklists page
 */
export default function ChecklistPage() {
  return (
    <div className="checklists-container">
      <div className="header">
        <h1 className="checklists-title">Activities</h1>
        <h4 className="checklists-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          pulvinar, justo non fringilla mollis, lacus nibh.</h4>
        <div className="checklists-tabs">
          <div className="incomplete-tab">
            <p>Incomplete</p>
          </div>
          <div className="complete-tab">
            <p>Complete</p>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="checklist-1">
          {/* Checklist1 map */}
        </div>
        <div className="checklist-2">
          {/* Checklist2 map */}
        </div>
        <div className="checklist-3">
          {/* Checklist3 map */}
        </div>
      </div>
    </div>
  );
}