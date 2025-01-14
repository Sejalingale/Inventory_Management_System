import React from 'react'
import Topnav from './Topnav'
import Navbar from './Navbar';

export default function Staff() {
  return (
    <div>
      <Navbar/>
      <Topnav />
      <div class="container">
        <div class="row my-4">
          <div class="col-md-4"></div>
          <div class="col-md-8">
            <table class="table bg-white">
              <thead class style={{ backgroundColor: "black" }}>
                <tr class="text-white">
                  <th scope="col">#</th>
                  <th scope="col">First_name</th>
                  <th scope="col">Last_name</th>
                  <th scope="col">Email id</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <a
                      class="btn  btn-sm text-white"
                      href=""
                      style={{ backgroundColor: "black" }}
                    >
                      View
                    </a>
                  </th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">
                    <a
                      class="btn  btn-sm text-white"
                      href=""
                      style={{ backgroundColor: "black" }}
                    >
                      View
                    </a>
                  </th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">
                    <a
                      class="btn  btn-sm text-white"
                      href=""
                      style={{ backgroundColor: "black" }}
                    >
                      View
                    </a>
                  </th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
