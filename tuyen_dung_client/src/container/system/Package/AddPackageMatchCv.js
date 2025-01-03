import React from "react";
import { useEffect, useState } from "react";
import {
  getPackageByIdCv,
  createPackageCv,
  updatePackageCv,
} from "../../../service/userService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Modal } from "reactstrap";
import "../../../components/modal/modal.css";
import LoadingPage from "../../../components/Loading";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
const AddPackageMatchCv = () => {
  const [isActionADD, setisActionADD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const url = useLocation();
  const param = url.pathname.endsWith("/")
  ? url.pathname.slice(0, -1).split("/").pop() 
  : url.pathname.split("/").pop();
  const [inputValues, setInputValues] = useState({
    value: "",
    price: "",
    name: "",
  });
  useEffect(() => {
    if (param != "add-package-cv") {
      let fetchDetailPackagePost = async () => {
        setisActionADD(false);
        let res = await getPackageByIdCv(param);
        if (res && res.errCode === 0) {
          setInputValues({
            ...inputValues,
            ["value"]: res.data.value,
            ["id"]: res.data.id,
            ["price"]: res.data.price,
            ["name"]: res.data.name,
          });
        }
      };
      fetchDetailPackagePost();
    }
    else{
        setisActionADD(true);
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  let handleSavePackageCv = async () => {
    setIsLoading(true);
    if (isActionADD === true) {
      if(inputValues.value === '' || inputValues.price === '' || inputValues.name === ''){
        setIsLoading(false);
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      let res = await createPackageCv({
        value: inputValues.value,
        name: inputValues.name,
        price: inputValues.price,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success(res.errMessage);
          setInputValues({
            ...inputValues,
            ["value"]: "",
            price: "",
            name: "",
          });
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error(res.errMessage);
      }, 1000);
    } else {
      let res = await updatePackageCv({
        value: inputValues.value,
        name: inputValues.name,
        price: inputValues.price,
        id: param,
      });
      setTimeout(() => {
        setIsLoading(false);
        if (res && res.errCode === 0) {
          toast.success(res.errMessage);
        } else if (res && res.errCode === 2) {
          toast.error(res.errMessage);
        } else toast.error(res.errMessage);
      }, 500);
    }
  };
  const history = useHistory();
  return (
    <div className="">
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div
              onClick={() => history.goBack()}
              className="mb-2 hover-pointer"
              style={{ color: "red" }}
            >
              <i class="fa-solid fa-arrow-left mr-2"></i>Quay lại
            </div>

            <h4 className="card-title">
              {isActionADD === true
                ? "Thêm mới gói xem ứng viên"
                : "Cập nhật gói xem ứng viên"}
            </h4>
            <br></br>
            <form className="form-sample">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Tên gói bài viết
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        value={inputValues.name}
                        name="name"
                        onChange={(event) => handleOnChange(event)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Giá trị</label>
                    <div className="col-sm-3">
                      <input
                        type="number"
                        value={inputValues.value}
                        name="value"
                        onChange={(event) => handleOnChange(event)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      {"Giá tiền (USD)"}
                    </label>
                    <div className="col-sm-3">
                      <input
                        type="number"
                        value={inputValues.price}
                        name="price"
                        onChange={(event) => handleOnChange(event)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn1 btn1-primary1 btn1-icon-text"
                onClick={() => handleSavePackageCv()}
              >
                <i class="ti-file btn1-icon-prepend"></i>
                Lưu
              </button>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <LoadingPage />}
    </div>
  );
};

export default AddPackageMatchCv;
