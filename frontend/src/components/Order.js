import React from 'react'
import Topnav from "./Topnav";
import Navbar from './Navbar';

export default function Order() {
  return (
    <div>
      <Navbar/>
      <Topnav />
      <div class="container">
        <div class="row my-4">
          <div class="col-md-4"></div>
          <div class="col-md-8">
            <table class="table bg-white">
              <thead class="bg-info">
                <tr class="text-white">
                  <th scope="col">#</th>
                  <th scope="col">Product</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Order by</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Broni</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>Kenneth</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                  <td>Cecilia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
