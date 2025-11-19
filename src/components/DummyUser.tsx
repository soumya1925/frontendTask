import React from "react";

interface DummyUserProps {
  onSelect: (user: { name: string; email: string; password: string }) => void;
}

const dummyUsers = [
  {
    name: "Ravi Raj",
    email: "raj@gmail.com",
    password: "891@@ghvV",
  },
  {
    name: "Shekhar Suman",
    email: "suman12@gmail.com",
    password: "489%#Mnsw",
  },
  {
    name: "Manas Rathode",
    email: "manas19@gmail.com",
    password: "mnPo!@4521",
  },
  {
    "name": "Vir Shankar",
    "email": "vir21@gmail.com",
    "password": "lmNo##21234"
  },
];

const DummyUser: React.FC<DummyUserProps> = ({ onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Quick Login</label>

      <select
        className="w-full border p-2 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-400"
        onChange={(e) => {
          const index = Number(e.target.value);
          if (!isNaN(index)) onSelect(dummyUsers[index]);
        }}
      >
        <option>Select Dummy User</option>
        {dummyUsers.map((user, i) => (
          <option key={i} value={i}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DummyUser;