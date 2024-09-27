import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import ProjectLayout from "../Layouts/ProjectLayout";

import KelulusanPage from "../KelulusanPage/KelulusanPage";
import DokumenPage from "../DokumenPage/DokumenPage";
import CalonPage from "../CalonPage/CalonPage";
import NotifyPage from "../NotifyPage/NotifyPage";

const SingleLatihanPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [kategori, setKategori] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("latihan")
            .get(urlParams.singleLatihanId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"kategori"] }})
            .then((res) => {
                set_entity(res || {});
                const kategori = Array.isArray(res.kategori)
            ? res.kategori.map((elem) => ({ _id: elem._id, category: elem.category }))
            : res.kategori
                ? [{ _id: res.kategori._id, category: res.kategori.category }]
                : [];
        setKategori(kategori);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Latihan", type: "error", message: error.message || "Failed get latihan" });
            });
    }, [props,urlParams.singleLatihanId]);


    const goBack = () => {
        navigate("/latihan");
    };

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Latihan</h3>
                </div>
                <p>latihan/{urlParams.singleLatihanId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Nombor Rujukan</label><p className="m-0 ml-3" >{_entity?.nomborRujukan}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Tajuk</label><p className="m-0 ml-3" >{_entity?.tajuk}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Status</label><p className="m-0 ml-3" ><i id="status" className={`pi ${_entity?.status?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Kategori</label>
                    {kategori.map((elem) => (
                        <Link key={elem._id} to={`/category/${elem._id}`}>
                            <div className="card">
                                <p className="text-xl text-primary">{elem.category}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <KelulusanPage/>
<DokumenPage/>
<CalonPage/>
<NotifyPage/>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleLatihanPage);
