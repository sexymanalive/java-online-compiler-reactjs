import React, { useState, useEffect } from "react";
import axios from "axios";
const Compiler = () => {
  const defaultCode = `
  class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
    `;
  const [code, setCode] = useState(defaultCode);
  const [userInput, setUserInput] = useState("");

  let userRequest = {
    source_code: code,
    stdin: userInput,
    language_id: 62,
  };

  const codeSubmission = async (userrequest) => {
    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions",
      userRequest,
      {
        headers: {
          "x-rapidapi-key":
            "79a436927emsh09f018423fcd661p1d07e3jsn9e5a44e74df8",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          useQueryString: true,
        },
      }
    );
    return response.data;
  };

  const getSolution = async (token) => {
    const response = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
      {
        headers: {
          "x-rapidapi-key":
            "79a436927emsh09f018423fcd661p1d07e3jsn9e5a44e74df8",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  // userData needs ( sourceCode , stdin, language_id)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let output = document.getElementById("output");
    output.innerHTML = "Loading...";

    codeSubmission(userRequest)
      .then((data) => {
        // data is the token
        console.log("Code Result is : ", data);
        getSolution(data.token)
          .then((data) => {
            console.log(data);
            console.log(" Output is : ", atob(data.stdout));
            let response = data; // convert json to js object

            if (response.stdout) {
              output.innerHTML = atob(response.stdout);
            } else if (response.stderr) {
              output.innerHTML = atob(response.stderr);
            } else {
              output.innerHTML = atob(response.compile_output);
            }

            // let jsonGetSolution = {
            //   status: { description: "Queue" },
            //   stderr: null,
            //   compile_output: null,
            // };
            // while (
            //   jsonGetSolution.status.description !== "Accepted" &&
            //   jsonGetSolution.stderr === null &&
            //   jsonGetSolution.compile_output === null
            // ) {
            //   jsonGetSolution = getSolution(data.token);

            // }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("Here is the code : ", code);

  return (
    <div className="container ">
      <div className="d-flex justify-content-between">
        <div className="playGround bg-light">
          <div className="d-flex justify-content-between">
            <h4> Java code </h4>
            <button
              disabled={code.trim() ? false : true}
              className="btn btn-warning"
              onClick={handleSubmit}
            >
              {" "}
              Run{" "}
            </button>
          </div>
          <textarea
            className="form-control"
            name=""
            id=""
            cols="90"
            rows="10"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <div className="inputField">
            <h5> Input values </h5>
            <textarea
              className="form-control"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              
              cols="90"
              rows="5"
            />
          </div>
        </div>

        <div className="output bg-light">
          <h4> Output</h4>
          <textarea
            disabled
            className="form-control"
            name=""
            id="output"
            cols="50"
            rows="17"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
