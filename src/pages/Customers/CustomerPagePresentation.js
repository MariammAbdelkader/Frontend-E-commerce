import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import styles from "./CustomerPageStyles";
import useCustomerPageContainer from "./CustomerPageContainer";

const CustomerList = () => {
  const { customers, loading, error, searchTerm, handleSearchChange } =
    useCustomerPageContainer();

  return (
    <Box sx={styles.customerListContainer}>
      <Box sx={styles.customerSearchBox}>
        <Typography variant="h4" sx={styles.headingStyle}>
          My Customers
        </Typography>
        <TextField
          variant="outlined"
          label="Search Customers"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={styles.searchInputStyle}
          size="small"
        />
      </Box>

      {loading ? (
        <Box sx={styles.CircularProgressbox}>
          <CircularProgress sx={styles.CircularProgress} />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={styles.filteredCustomerBoxStyle}>
          {customers.map((customer, index) => (
            <Box key={index} sx={styles.cardWrapper}>
              <Card sx={styles.cardStyle}>
                <Box sx={styles.fixedHeader}>
                  <Box sx={styles.boxStyle}>
                    <Avatar
                      src={customer.image}
                      alt={customer.firstName}
                      sx={styles.avatarStyle}
                    />
                    <Box sx={styles.nameAndEmailStyle}>
                      <Typography
                        variant="subtitle1"
                        sx={styles.cardTitleStyle}>
                        {customer.firstName + " " + customer.lastName}
                      </Typography>
                      <Typography variant="body2" sx={styles.cardTitleStyle}>
                        {customer.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <CardContent sx={styles.scrollableCardContent}>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>FirstName: </strong>
                    <span style={styles.textStyle}>{customer.firstName}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>LastName: </strong>
                    <span style={styles.textStyle}>{customer.lastName}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Phone: </strong>
                    <span style={styles.textStyle}>{customer.phoneNumber}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Address: </strong>
                    <span style={styles.textStyle}>{customer.address}</span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Segmentation: </strong>
                    <span style={styles.textStyle}>
                      {customer.segmentation}
                    </span>
                  </Typography>
                  <Typography sx={styles.cardContentStyle}>
                    <strong style={styles.strongText}>Gender: </strong>
                    <span style={styles.textStyle}>{customer.gender}</span>
                  </Typography>
                </CardContent>

                {/* Buttons */}
                <Box
                  component="button"
                  onClick={() => console.log("View Profile", customer.userId)}
                  sx={styles.viewProfileButton}>
                  View Profile
                </Box>
                <Box
                  component="button"
                  onClick={() => console.log("View History", customer.userId)}
                  sx={styles.viewHistoryButton}>
                  View History
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CustomerList;

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Box,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import styles from "./CustomerPageStyles";

// const dummyCustomers = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     email: "john@example.com",
//     phone: "1234567890",
//     address: "123 Main St",
//     image: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm St",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     id: 2,
//     firstName: "Jane",
//     lastName: "Smith",
//     email: "jane@example.com",
//     phone: "0987654321",
//     address: "456 Elm Stajsbdj jasjdasjS tajsbdjjas jdasjStajsbdjjasjdasj",
//     image: "https://i.pravatar.cc/150?img=2",
//   },
//   {
//     id: 3,
//     firstName: "Alice",
//     lastName: "Brown",
//     email: "alice@example.com",
//     phone: "5555555555",
//     address: "789 Oak Ave",
//     image: "https://i.pravatar.cc/150?img=3",
//   },
// ];

// const CustomerList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading delay
//     const timer = setTimeout(() => {
//       setCustomers(dummyCustomers);
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.phone.includes(searchTerm)
//   );

//   return (
//     <Box sx={styles.customerListContainer}>
//       <Box sx={styles.customerSearchBox}>
//         <Typography variant="h4" sx={styles.headingStyle}>
//           My Customers
//         </Typography>
//         <TextField
//           variant="outlined"
//           label="Search Customers"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={styles.searchInputStyle}
//         />
//       </Box>

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <Box sx={styles.filteredCustomerBoxStyle}>
//           {filteredCustomers.map((customer) => (
//             <Box key={customer.id} sx={styles.cardWrapper}>
//               <Card sx={styles.cardStyle}>
//                 {/* Fixed Top Section */}
//                 <Box sx={styles.fixedHeader}>
//                   <Box sx={styles.boxStyle}>
//                     <Avatar
//                       src={customer.image}
//                       alt={customer.firstName}
//                       sx={styles.avatarStyle}
//                     />
//                     <Box sx={styles.nameAndEmailStyle}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={styles.cardTitleStyle}>
//                         {customer.firstName} {customer.lastName}
//                       </Typography>
//                       <Typography variant="body2" sx={styles.cardTitleStyle}>
//                         {customer.email}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Scrollable Content */}
//                 <CardContent sx={styles.scrollableCardContent}>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>FirstName: </strong>
//                     <span style={styles.textStyle}>{customer.firstName}</span>
//                   </Typography>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>LastName: </strong>
//                     <span style={styles.textStyle}>{customer.lastName}</span>
//                   </Typography>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>Phone: </strong>
//                     <span style={styles.textStyle}>{customer.phone}</span>
//                   </Typography>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>Address: </strong>
//                     <span style={styles.textStyle}>{customer.address}</span>
//                   </Typography>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>Segmentation: </strong>
//                     <span style={styles.textStyle}>
//                       {customer.segmentation}
//                     </span>
//                   </Typography>
//                   <Typography sx={styles.cardContentStyle}>
//                     <strong style={styles.strongText}>Gender: </strong>
//                     <span style={styles.textStyle}>{customer.gender}</span>
//                   </Typography>
//                 </CardContent>

//                 {/* Buttons */}
//                 <Box
//                   component="button"
//                   onClick={() => console.log("View Profile", customer.id)}
//                   sx={styles.viewProfileButton}>
//                   View Profile
//                 </Box>
//                 <Box
//                   component="button"
//                   onClick={() => console.log("View History", customer.id)}
//                   sx={styles.viewHistoryButton}>
//                   View History
//                 </Box>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default CustomerList;
