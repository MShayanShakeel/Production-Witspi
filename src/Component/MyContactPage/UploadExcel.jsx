// import React, { useState, useEffect } from "react";
// import Papa from "papaparse";

// const Banner = () => {
//   const [csvData, setCsvData] = useState([]);
//   const [error, setError] = useState(null);

//   const [selectedFirstName, setSelectedFirstName] = useState("");
//   const [selectedLastName, setSelectedLastName] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedPhoneNo, setSelectedPhoneNo] = useState("");

//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       Papa.parse(file, {
//         header: true, // Treat the first row as a header
//         dynamicTyping: true, // Automatically convert numbers and booleans
//         complete: (result) => {
//           // 'data' contains the parsed CSV data
//           setCsvData(result.data);
//           if (result.data.length > 0) {
//             const headers = Object.keys(result.data[0]);
//             setSelectedFirstName(headers[0]);
//             setSelectedLastName(headers[1]);
//             setSelectedCountry(headers[2]);
//             setSelectedPhoneNo(headers[3]);
//           }
//         },
//         error: (err) => {
//           setError(err.message);
//         },
//       });
//     }
//   };

//   return (
//     <>
//       {/* ... Your other components ... */}
//       <div className="w-[100%] z-50 h-auto bg-[#FFFFFF] mt-[2rem]">
//         <div className="w-[80%] h-auto m-[auto] grid grid-cols-2 gap-[2.5rem]">
//           <div className="w-[45%] h-auto">
//             <div className="relative h-10 w-[28rem] min-w-[200px]">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="first_name_dropdown"
//               >
//                 First Name
//               </label>
//               <div className="mb-6">
//                 <select
//                   id="first_name_dropdown"
//                   value={selectedFirstName}
//                   onChange={(e) => setSelectedFirstName(e.target.value)}
//                   className="bg-[#cbeeea] border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   {csvData[0] &&
//                     Object.keys(csvData[0]).map((header) => (
//                       <option key={header} value={header}>
//                         {header}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-[45%] h-auto mt-1">
//             <div className="relative h-10 w-[28rem] min-w-[200px]">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="last_name_dropdown"
//               >
//                 Last Name
//               </label>
//               <div className="mb-6">
//                 <select
//                   id="last_name_dropdown"
//                   value={selectedLastName}
//                   onChange={(e) => setSelectedLastName(e.target.value)}
//                   className="bg-[#cbeeea] border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   {csvData[0] &&
//                     Object.keys(csvData[0]).map((header) => (
//                       <option key={header} value={header}>
//                         {header}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-[45%] h-auto">
//             <div className="relative h-10 w-[28rem] min-w-[200px]">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="phone_no_dropdown"
//               >
//                 Phone No
//               </label>
//               <div className="mb-6">
//                 <select
//                   id="phone_no_dropdown"
//                   value={selectedPhoneNo}
//                   onChange={(e) => setSelectedPhoneNo(e.target.value)}
//                   className="bg-[#cbeeea] border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   {csvData[0] &&
//                     Object.keys(csvData[0]).map((header) => (
//                       <option key={header} value={header}>
//                         {header}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-[45%] h-auto">
//             <div className="relative h-10 w-[28rem] min-w-[200px]">
//               <label
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 htmlFor="country_dropdown"
//               >
//                 Country
//               </label>
//               <div className="mb-6">
//                 <select
//                   id="country_dropdown"
//                   value={selectedCountry}
//                   onChange={(e) => setSelectedCountry(e.target.value)}
//                   className="bg-[#cbeeea] border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   required
//                 >
//                   {csvData[0] &&
//                     Object.keys(csvData[0]).map((header) => (
//                       <option key={header} value={header}>
//                         {header}
//                       </option>
//                     ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-[100%] h-auto mt-[4rem]">
//         <div className="w-[80%] h-auto m-auto">
//           <input type="file" accept=".csv" onChange={handleFileInputChange} />
//           {error && <p>Error: {error}</p>}
//           <table className="border-separate border-spacing-2 border border-slate-400">
//             <thead className="border border-slate-300">
//               <tr className="border border-slate-300">
//                 {csvData[0] &&
//                   Object.keys(csvData[0]).map((header) => (
//                     <th key={header}>{header}</th>
//                   ))}
//               </tr>
//             </thead>
//             <tbody className="border border-slate-300">
//               {csvData.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, i) => (
//                     <td key={i}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;
