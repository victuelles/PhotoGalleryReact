import React from 'react';
import Feature2 from '../images/salsa_champs.png';
import ReactGA from 'react-ga';
import './schedule.css';
ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);


const Schedule = () => 
<div>

     <section className="special-area bg-white section_padding_100" id="about">
        <div className="container">
            <div className="row">
                <div className="col-12">
                 
                    <div className="section-heading text-center">
                        <h2>Event Schedule</h2>
                        <div className="line-shape"></div>
                    </div>
                </div>
            </div>
            <div className="row">
             
             <div className="col-12 ">
                 <div className="single-special text-center wow fadeInUp" data-wow-delay="0.2s">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Event</th>
                            <th scope="col">Location</th>
                            <th scope="col">Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th><h4>July 28, Saturday </h4> 
                                    <p>Dinner: 7:00 - 8:00 PM </p>
                                    <p> Dance: 9:00 PM - Midnight</p>
                                </th>
                                <td><h4>30th Anniversary Dinner-Dance,<br/> San Jose Sampaguita Lions Club</h4></td>
                                <td> Mt Hamilton Grange Hall,<br/>  2840 Aborn Rd, San Jose, CA <br/>
                                 <a href="https://goo.gl/maps/Aq6yEUg6NVH2">Show Map</a>
                                
                                </td>
                                <td>DJ Orlie <a href="tel:1-408-903-5150">(408) 903-5150</a><br/> 
                                Attire:  Semi-formal<br/>
                                Donation $30</td>
                            </tr>
                            <tr>
                                <th><h4>August 4, Saturday</h4> 
                                    <p> 6:00 PM - Midnight </p>
                                   
                                </th>
                                <td><h4>Princess Night 6th Anniversary<br/> Dinner-Dance,<br/>  Luzvimin Association of the Bay Area</h4></td>
                                <td>Patio Espanol, <br/>  2850 Alemany Blvd, San Francisco  <br/>
                                 <a href="https://goo.gl/maps/vwFFsLoamDH2">Show Map</a>
                                
                                </td>
                                <td> Bernie Zabala  <a href="tel:1-650-271-6197">(650) 271-6197</a><br/> 
                                Attire:  Strictly Formal <br/>
                                Donation $65</td>
                            </tr>
                            <tr>
                                <th><h4>September 8, Saturday  </h4> 
                                    <p> 6:00 PM - Midnight</p>
                                   
                                </th>
                                <td><h4>Summer Fundraising Dinner-Dance</h4></td>
                                <td> St Timothy Church,<br/>   1515 Dolan Ave, San Mateo, CA <br/>
                                 <a href="https://goo.gl/maps/8PuyS6D3u8R2">Show Map</a>
                                
                                </td>
                                <td>Amelia Agustin  <a href="tel:1-415-806-4165  ">(415) 806-4165  </a><br/> 
                                Attire:  Semi-formal<br/>
                                Donation $40</td>
                            </tr>


                           <tr>
                                <th><h4>October 13, Saturday   </h4> 
                                    <p> 6:30 PM - Midnight</p>
                                   
                                </th>
                                <td><h4>Filipino Heritage Night</h4>
                                    <h4> Malasiqui Association of California</h4>
                                </td>
                                <td> Westlake Park Merced Room,<br/>   145 Lake Merced Blvd, Daly City <br/>
                                 <a href="https://goo.gl/maps/5YvxPhV1in32">Show Map</a>
                                
                                </td>
                                <td>Lydia Pomposo  <a href="tel:1-650-583-0364  ">(650) 583-0364  </a><br/> 
                                Attire:  Filipiniana or Semi-formal<br/>
                                Donation $40</td>
                            </tr>



                        </tbody>
                    </table>
                 </div>
             </div>
             </div>

        </div>
       
       
    </section>
 
</div>

 
export default Schedule;