import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import iconUserDetail from "../../assets/icon/fi_users.png";
import iconDropdown from "../../assets/icon/icon_dropdown.png";
import "../CarDetail/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { orderCar } from "../../redux/features/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const CarDetail = () => {
  const param = useParams();
  const carById = useParams();
  const [list, setList] = useState();
  const dropDown = () => setList(!list);
  const [carsDetail, setcarsDetail] = useState({});
  const dispatch = useDispatch();

  // calendar feature
  const [durationRent, setDurationRent] = useState([null, null]);
  const [firstDay, lastDay] = durationRent;
  const [chooseCar, setChooseCar] = useState("");

  useEffect(() => {
    handleGetCarById();
  }, []);

  const handleGetCarById = () => {
    axios
      .get(`https://api-car-rental.binaracademy.org/customer/car/${param.id}`)
      .then((res) => {
        console.log(res.data);
        setcarsDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  // calendar feature
  useEffect(() => {
    let day = 0;

    if (firstDay && lastDay) {
      day = moment(lastDay).diff(moment(firstDay), "days") + 1;
      setChooseCar(day);
    } else {
      setChooseCar(0);
    }
  }, [firstDay, lastDay]);

  // const handleCustomerOrder = () => {

  //   const token = localStorage.getItem("accessToken")
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   axios
  //     .post("https://api-car-rental.binaracademy.org/customer/order", config, {
  //       car_id: Number(carsDetail.id),
  //       start_rent: firstDay,
  //       end_rent: lastDay,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  const handleCustomerOrder = () => {
    dispatch(
      orderCar({
        start_rent_at: moment(durationRent[0]).format("YYYY-MM-DD"),
        finish_rent_at: moment(durationRent[1]).format("YYYY-MM-DD"),
        car_id: Number(carById.id),
      })
    );
  };

  const hiddenButton = () => {
    chooseCar(!setChooseCar);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid blank-container">
        <div className="container">
          <div className="wrap-package-car">
            <div className="card card-package">
              <div className="card-body">
                <h1 className="header-detail-text mt-2">Tentang Paket</h1>
                <div className="mt-4">
                  <h2 className="sub-detail-text">Include</h2>
                  <ul className="ps-4">
                    <li className="content-detail-text">
                      Apa saja yang termasuk dalam paket misal durasi max 12 jam
                    </li>
                    <li className="content-detail-text">Sudah termasuk bensin selama 12 jam</li>
                    <li className="content-detail-text">Sudah termasuk Tiket Wisata</li>
                    <li className="content-detail-text">Sudah termasuk pajak</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h2 className="sub-detail-text">Exclude</h2>
                  <ul className="ps-4">
                    <li className="content-detail-text ">
                      Tidak termasuk biaya makan sopir Rp 75.000/hari
                    </li>
                    <li className="content-detail-text ">
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
                    </li>
                    <li className="content-detail-text ">Tidak termasuk akomodasi penginapan</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <div className="d-flex justify-content-between">
                    <h2 className="sub-detail-text mb-0">Refund, Reschedule, Overtime</h2>
                    <img onClick={dropDown} src={iconDropdown} />
                  </div>
                  {list && (
                    <ul className="ps-4 mt-1 ">
                      <li className="content-detail-text">
                        Tidak termasuk biaya makan sopir Rp 75.000/hari
                      </li>
                      <li className="content-detail-text">
                        Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
                      </li>
                      <li className="content-detail-text">Tidak termasuk akomodasi penginapan</li>
                      <li className="content-detail-text">
                        Tidak termasuk biaya makan sopir Rp 75.000/hari
                      </li>
                      <li className="content-detail-text">
                        Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
                      </li>
                      <li className="content-detail-text">Tidak termasuk akomodasi penginapan</li>
                      <li className="content-detail-text">
                        Tidak termasuk biaya makan sopir Rp 75.000/hari
                      </li>
                      <li className="content-detail-text">
                        Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
                      </li>
                      <li className="content-detail-text">Tidak termasuk akomodasi penginapan</li>
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="card card-detail-car">
              <div className="card-body">
                <div className="wrap-detail-car m-auto">
                  <img className="img-detail-car" src={carsDetail.image} />
                </div>
                <div className="d-flex flex-column mt-5">
                  <h1 className="detail-car-text m-0">{carsDetail.name}</h1>
                  <div className="wrap-detail">
                    <img className="icon-detail me-2" src={iconUserDetail} />
                    <span className="type-detail">
                      {(() => {
                        if (carsDetail.category == "small") {
                          return "2 - 4 Orang";
                        } else if (carsDetail.category == "medium") {
                          return "4 - 6 Orang";
                        } else {
                          return "6 - 8 Orang";
                        }
                      })()}
                    </span>
                    <div>
                      <p> Tentukan lama sewa mobil (max. 7 hari)</p>
                      <DatePicker
                        dateFormat="dd MMM yyyy"
                        showIcon
                        selectsRange={true}
                        startDate={firstDay}
                        endDate={lastDay}
                        onChange={(update) => {
                          setDurationRent(update);
                        }}
                        minDate={firstDay ? new Date(lastDay) : new Date()}
                        maxDate={
                          firstDay
                            ? new Date(new Date(firstDay).setDate(new Date(firstDay).getDate() + 6))
                            : null
                        }
                        // isClearable
                        placeholderText="Pilih tanggal mulai dan tanggal akhir sewa"
                      />
                    </div>
                    <div className="mt-3">
                      <Link to={`/car/${carsDetail.id}/payment`}>
                        <button disabled={!chooseCar} onClick={handleCustomerOrder}>
                          {" "}
                          Pembayaran
                        </button>
                      </Link>
                    </div>

                    <div className="d-flex justify-content-between mt-5">
                      <p className="detail-car-text">Total</p>
                      <p className="detail-car-text">{`Rp ${carsDetail.price * chooseCar}`}</p>
                    </div>
                  </div>
                  {/* calendar feature */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CarDetail;
