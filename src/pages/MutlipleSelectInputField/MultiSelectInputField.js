import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  Container,
  CardBody,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

/*
Hey, I am Shiv Prakash Anil Gupta, a 2023 IIT Guwahati graduate. In this code I have
used bootstrap/reactstrap to design the layout and make it responsive across all the viewports.
I have used two state arrays i.e options and selectedOptions, options will store details
of all the users, selectedOptions will store details of those users which are converted
into chips. I have used Dropdown feature of bootstrap which creates a dynamic dropdown.
I have used font awesome icons for the user logo. I have taken care of duplicate users, if there are more than two users which
have same name, it will work fine without any errors. I have also created a clear all 
button which will clear all the chips/selected users, but for now I have made it 
display:hidden. I have checked my code, it should meet all the requirements as specified in the google doc,
if there is any improvements then I would appreciate the effort.

Install the following dependenices:
bootstrap
font-awesome icons
 */

const MultiSelectInputField = props => {
  const { options2 } = props //send optionsArr from props

  const [options, setOptions] = useState(
    options2?.length > 0
      ? options2
      : [
          {
            text: "Shiv Prakash Anil Gupta",
            selected: false,
            email: "shivprakashail@gmail.com",
          },
          {
            text: "Nick Giannopolous",
            selected: false,
            email: "nickgiannopolus@gmail.com",
          },
          {
            text: "Narayana Garner",
            selected: false,
            email: "n.garner@gmail.com",
          },
          { text: "Anita Gros", selected: false, email: "a.gros@gmail.com" },
          {
            text: "Megan Smith",
            selected: false,
            email: "megan.Smith@gmail.com",
          },
          {
            text: "Raushan Kumar",
            selected: false,
            email: "raushan.kumar@gmail.com",
          },
          {
            text: "Abhay Singh",
            selected: false,
            email: "abhay.singh@gmail.com",
          },
          { text: "Ravi Teja", selected: false, email: "ravi.teja@gmail.com" },
          {
            text: "Rahul Gupta",
            selected: false,
            email: "rahul.gupta@gmail.com",
          },
          {
            text: "Abhay Singh",
            selected: false,
            email: "abhay.singh@gmail.com",
          },
          // Add more options as needed
        ]
  ) // all users details
  const [selectedOptions, setSelectedOptions] = useState([]) // users which are selected
  const [searchValue, setSearchValue] = useState("") // user name which is entered in the text area
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Additional state to keep track of whether the backspace key is currently being pressed
  const [isBackspacePressed, setIsBackspacePressed] = useState(0)

  /*********************************** Handle functions ********************************/

  // Handle function for backspace keydown
  const handleBackspaceKeyDown = e => {
    if (e.key === "Backspace") {
      // Check if the input is empty and backspace is pressed
      if (
        searchValue === "" &&
        selectedOptions.length > 0 &&
        isBackspacePressed === 0
      ) {
        setIsBackspacePressed(1)
      }
      if (
        searchValue === "" &&
        selectedOptions.length > 0 &&
        isBackspacePressed === 1
      ) {
        // Select the last element of selectedOptions
        setIsBackspacePressed(0)
        const lastOption = selectedOptions[selectedOptions.length - 1]
        handleOptionClick(lastOption)
      }
    }
  }

  // handle function to save the entered user
  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }

  // handle function to remove a user or add new user
  const handleOptionClick = option => {
    option.selected = !option.selected

    if (option.selected) {
      setSelectedOptions([...selectedOptions, option])
      setOptions(options.filter(o => o !== option))
      setSearchValue("")
    } else {
      setSelectedOptions(selectedOptions.filter(o => o !== option))
      setOptions([...options, option])
    }
  }

  // handle function to clear all the selected users
  const handleClearAllClick = () => {
    const updatedOptions = selectedOptions.map(opt => ({
      ...opt,
      selected: false,
    }))
    setOptions([...options, ...updatedOptions])
    setSelectedOptions([])
  }

  // handle function to open the dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState)

  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            <Row className="d-sm-block d-md-flex align-items-center m-4">
              {/* Title of the page */}
              <Row className="card-title flex-grow-1">
                <h2 className="d-inline">Pick Users</h2>
              </Row>

              <Row>
                <Dropdown
                  direction="down"
                  isOpen={dropdownOpen}
                  toggle={toggle}
                >
                  <div className="row bg-white border-bottom my-3">
                    <Col className="my-2">
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {/* chips/selected users displayed here*/}
                        {selectedOptions.length > 0 &&
                          selectedOptions.map((option, index) => (
                            <span
                              id={option.text + index}
                              key={option.text + index}
                              className={`${
                                isBackspacePressed &&
                                index === selectedOptions.length - 1
                                  ? "border border-3 border-danger"
                                  : ""
                              } bg-dark rounded-pill text-light m-1 p-1`}
                            >
                              <i className="fas fa-user-circle mx-2" />
                              {option.text}
                              <span
                                className="px-1"
                                onClick={e => {
                                  e.stopPropagation()
                                  handleOptionClick(option)
                                }}
                              >
                                🗙
                              </span>
                            </span>
                          ))}

                        {/* input field to search the users and to show the dropdown */}
                        <span>
                          <DropdownToggle caret tag="a" className="card-drop">
                            <Input
                              className="py-2 border-0"
                              type="text"
                              placeholder="Add new user..."
                              value={searchValue}
                              onChange={e => handleSearchChange(e)}
                              onKeyDown={e => handleBackspaceKeyDown(e)}
                            />
                          </DropdownToggle>
                        </span>

                        {/* clearing all the chips at once */}
                        {selectedOptions.length > 0 && (
                          <span
                            key="clearAll"
                            className="d-none text-end bg-dark rounded-pill text-light m-1 p-1"
                            onClick={e => {
                              e.stopPropagation()
                              handleClearAllClick()
                            }}
                          >
                            Clear All
                          </span>
                        )}
                      </div>
                    </Col>
                  </div>

                  {/* main dropdown menu */}
                  {options?.length > 0 && (
                    <DropdownMenu
                      style={{
                        maxHeight: "100px",
                        overflowY: "auto",
                      }}
                    >
                      {options
                        .filter(o =>
                          o?.text
                            ?.toUpperCase()
                            ?.includes(searchValue.toUpperCase())
                        )
                        .map((option, index) => (
                          <DropdownItem
                            key={option.text + index}
                            className={` ${option.selected ? "checked" : ""}`}
                            onClick={() => handleOptionClick(option)}
                          >
                            <input
                              className="d-none"
                              type="checkbox"
                              checked={option.selected}
                              onChange={() => {}}
                            />
                            {/* font qwesome icon */}
                            <i className="fas fa-user-circle mx-1" />{" "}
                            {option.text}
                            &nbsp; &nbsp; &nbsp;&nbsp;
                            <span className="text-muted text-end">
                              {option.email}
                            </span>
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  )}

                  {/* when all items/users are selected or converted to chips, 
                  also when the entered user is not found
                   */}
                  {(options?.length === 0 ||
                    (searchValue !== "" &&
                      options.filter(o =>
                        o?.text
                          ?.toUpperCase()
                          ?.includes(searchValue.toUpperCase())
                      ).length === 0)) && (
                    <DropdownMenu
                      style={{
                        maxHeight: "100px",
                        overflowY: "auto",
                      }}
                    >
                      <DropdownItem key={"noUsersFound"}>
                        !!! No Users Found
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </Dropdown>
              </Row>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default MultiSelectInputField
