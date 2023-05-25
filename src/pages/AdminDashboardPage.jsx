import React, { useEffect, useState } from "react";
const AdminDashboardPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const data = [
    {
      id: 1,
      title: "Rune raises $100,000 for marketing through NFT butterflies sale",
      photo: "https://picsum.photos/200/200",
      user_id: 1,
      username: "meta_world98",
      create_at: "2022-01-01",
      update_at: "2022-01-01T04:00:00.000Z",
      like: 201,
    },
    {
      id: 2,
      title: "Rune raises $100,000 for marketing through NFT butterflies sale",
      photo: "https://picsum.photos/200/200",
      user_id: 2,
      username: "meta_world98",
      create_at: "2022-01-01",
      update_at: "2022-01-01T04:00:00.000Z",
      like: 214,
    },
    {
      id: 3,
      title: "Rune raises $100,000 for marketing through NFT butterflies sale",
      photo: "https://picsum.photos/200/200",
      user_id: 3,
      username: "meta_world98",
      create_at: "2022-01-01",
      update_at: "2022-01-01T04:00:00.000Z",
      like: 109,
    },
    {
      id: 4,
      title: "Rune raises $100,000 for marketing through NFT butterflies sale",
      photo: "https://picsum.photos/200/200",
      user_id: 4,
      username: "meta_world98",
      create_at: "2022-01-01",
      update_at: "2022-01-01T04:00:00.000Z",
      like: 90,
    },
  ];
  return (
    <div className="bodys pt-4">
      <div className="container mx-auto bg-dark-500 ">
        <div className="flex align-center justify-between">
          <p className="text-white text-3xl	">APP</p>
          <button className="bg-lime-500	 hover:bg-blue-700 text-black  py-2 px-6 rounded-full">
            Logout
          </button>
        </div>

        <div className="flex align-center justify-between mt-20">
          <p className="text-white text-3xl">Today’s leaderboard</p>
          <div className=" flex gap-3 bg-slate-800 text-white  py-3 px-6 rounded">
            <p>{currentDate.toLocaleDateString()}</p>
            <button className="bg-lime-500	 hover:bg-blue-700 text-black px-2  rounded">
              SUBMISSION OPEN
            </button>
            <span>{currentDate.toLocaleTimeString()}</span>
          </div>
        </div>
        {data.map((item) => (
          <div key={item.id}>
            <ul className="mt-10">
              <li className=" flex items-center justify-between text-white py-4 px-4 border-2 border-white-100">
                <div className="flex items-center gap-2">
                  <img
                    className="w-48 h-14"
                    src={item.photo}
                    alt={item.title}
                  />
                  <p className="text-white-400 text-xl	 w-22">{item.title}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img
                    className="w-4 h-4 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKbrrDhzbHN03rqymUSYEs9oPJQ9sW0J1JeQ&usqp=CAU"
                    alt=""
                  />
                  <p className="text-lime-500 text-xs	 w-22">{item.username}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-white-400 w-22">{item.like}</p>
                  <img
                    className="w-4 h-4"
                    src="https://findicons.com/files/icons/744/juicy_fruit/256/top_arrow.png"
                    alt=""
                  />
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
