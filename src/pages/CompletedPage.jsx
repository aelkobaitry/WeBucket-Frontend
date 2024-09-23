import NavBar from "../components/NavBar.jsx";
import Stars from "../components/Stars.jsx";
import { DataGrid } from "@mui/x-data-grid";

export default function CompletedPage() {
  const rows = [
    {
      id: 1,
      type: "activity",
      item: "Exploring Los Angeles",
      description: "Lorem ipsum for the city of angels (certainly not me)",
      ratings: [8, 6],
      thoughts: [
        "Person1's Thoughts here",
        "I'm going to use this opportunity to test more overflow, which should commence shortly.",
      ],
    },
    {
      id: 2,
      type: "activity",
      item: "Skydiving in Massachusetts",
      description:
        "Skydiving should be fun. I believe this is in Natick but have absolutely no idea. " +
        "The primary purpose of my yapping is to test the overflow functionality, which " +
        "should start in a sec. Anyways, thanks for reading this.",
      ratings: [6, 5],
      thoughts: ["Person 1's Thoughts here", "Person 2's Thoughts here"],
    },
    {
      id: 3,
      type: "activity",
      item: "Exploring Chicago",
      description: "we out here",
      ratings: [2, 4],
      thoughts: ["Person 1's Thoughts here", "Person 2's Thoughts here"],
    },
    {
      id: 4,
      type: "food",
      item: "Okonomiyaki",
      description: "chinchikurin time",
      ratings: [10, 10],
      thoughts: ["Person 1's Thoughts here", "Person 2's Thoughts here"],
    },
    {
      id: 5,
      type: "media",
      item: "2001: A Space Odyssey",
      description: "♡",
      ratings: [10, 10],
      thoughts: ["Person 1's Thoughts here", "Person 2's Thoughts here"],
    },
  ];
  const colummns = [
    {
      field: "type",
      headerName: "Type",
      width: 40,
      headerClassName: "bg-dark-purple text-white",
      resizable: false,
      renderCell: ({ value }) => {
        let source = "";
        switch (value) {
          case "activity":
            source = "src/assets/icons/plane.png";
            break;
          case "food":
            source = "src/assets/icons/pizza.png";
            break;
          case "media":
            source = "src/assets/icons/dice.png";
            break;
        }

        return (
          <div className="flex items-center h-full">
            <img src={source} alt={`${value}-icon`} />
          </div>
        );
      },
    },
    {
      field: "item",
      headerName: "Item",
      width: 200,
      headerClassName: "bg-dark-purple text-white",
      renderCell: ({ value }) => (
        <div className="flex items-center min-h-20 pr-2 overflow-hidden line-clamp-4">
          <p className="text-light-purple text-sm">{value}</p>
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 300,
      headerClassName: "bg-dark-purple text-white",
      renderCell: ({ value }) => (
        <div className="flex items-center min-h-20">
          <p className="text-light-purple text-sm overflow-hidden overflow-ellipsis line-clamp-3">
            {value}
          </p>
        </div>
      ),
    },
    {
      field: "ratings",
      headerName: "Rating",
      width: 100,
      headerClassName: "bg-dark-purple text-white",
      renderCell: ({ value }) => (
        <div className="text-light-purple flex flex-wrap items-center min-h-20 overflow-scroll">
          <div className="w-full flex items-center space-x-2">
            <img
              src="src/assets/avatar-test-1.png"
              alt="pfp-1"
              className="h-5/6 w-auto max-h-8 align-baseline border-2 border-white rounded-full"
            />
            <p className="text-light-purple text-sm">{`${value[0]}/10`}</p>
          </div>
          <div className="w-full flex items-center space-x-2">
            <img
              src="src/assets/avatar-test-2.png"
              alt="pfp-2"
              className="h-5/6 w-auto max-h-8 align-baseline border-2 border-white rounded-full"
            />
            <p className="text-light-purple text-sm">{`${value[1]}/10`}</p>
          </div>
        </div>
      ),
    },
    {
      field: "thoughts",
      headerName: "Thoughts",
      flex: 1,
      width: "400",
      headerClassName: "bg-dark-purple text-white",
      editable: true,
      renderCell: ({ value }) => (
        <div className="text-light-purple col-span-2 flex flex-wrap items-center min-h-20">
          <p className="text-light-purple text-sm pr-2 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {value[0]}
          </p>
          <p className="text-light-purple text-sm pr-2 w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {value[1]}
          </p>
        </div>
      ),
    },
    {
      field: "details-btn",
      headerName: "",
      resizable: false,
      filterable: false,
      sortable: false,
      editable: false,
      groupable: false,
      hideable: false,
      flex: 0.3,
      headerClassName: "bg-dark-purple text-white",
      minWidth: 150,
      renderCell: () => (
        <div className="text-light-purple flex items-center min-h-20">
          <button
            onClick={() => {}}
            className="bg-transparent border-light-purple border-2 p-0 box-border duration-300 hover:border-4"
          >
            <p className="text-white px-6 py-3 text-sm">Details</p>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-screen p-8">
      <NavBar />
      <Stars />
      <div className="header pt-20 z-10 relative">
        <h1 className="font-title p-4">Completed</h1>
        <h4 className="pl-10 pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          pulvinar, justo non fringilla mollis, lacus nibh.
        </h4>
        <div className="text-sm flex mt-8">
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
          <div className="relative w-28 h-auto -left-8 text-center duration-300 cursor-pointer z-0">
            <p className="tab-text text-white absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
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
      <div className="mt-8">
        <DataGrid
          rows={rows}
          columns={colummns}
          getRowHeight={() => "auto"}
          sx={{
            fontFamily: "ubuntu",
            backgroundColor: "rgba(0, 0, 0, 0)",
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            '&.MuiDataGrid-root': {
              border: 'none',
              backgroundColor: "rgba(0, 0, 0, 0)",
              overflowX: "scroll",
            },
            '&.MuiDataGrid-columnHeader': {
              backgroundColor: "rgba(0, 0, 0, 0)",
            }

          }}
        />
      </div>
    </div>
  );
}
