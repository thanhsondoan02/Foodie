/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import resetLocation from '../../../helpers/ResetLocation';
import { apiCmsGetContact } from '../../../services/CmsService';
import { toastError } from '../../../helpers/toastHelper';
import "./contactCms.css"
import NotLoginCms from '../NotLoginCms';
import { set } from 'lodash';
import { Loading } from '../Loading';

export default function ContactCms({ isValidAdmin, openLoginFragment }) {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onPageChange = (event) => {
    getContactFromServer(event.selected + 1);
    resetLocation();
  };

  const getContactFromServer = async (page) => {
    setIsLoading(true);
    let limit = 5
    setCurrentPage(page);
    setTotalPages(0);
    setContacts([]);
    try {
      const response = await apiCmsGetContact(page, limit);
      if (response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages)
        setContacts(response.data.DT.contacts)
      } else {
        console.log(response.data.EM);
        toastError(response.data.EM);
      }
    } catch (err) {
      console.log(err);
      toastError(err.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    document.title = "Foodie Restaurant | Contact CMS";
    if (isValidAdmin) {
      getContactFromServer(1);
    }
  }, [isValidAdmin]);

  return (
    <>
      {!isValidAdmin ? <NotLoginCms openLoginFragment={openLoginFragment} />
        : isLoading ? <Loading message={"Loading contacts..."} /> :
          <main className='contact-cms-main'>
            <h1>Contact of your customers</h1>

            <table>
              <colgroup>
                <col className="contact-cms-id" />
                <col className="contact-cms-name" />
                <col className="contact-cms-email" />
                <col className="contact-cms-message" />
              </colgroup>
              <tr>
                <th>Id</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
              {
                contacts.map((contact, _) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))
              }
            </table>

            <ReactPaginate
              className="contact-cms-pagination"
              breakLabel="..."
              nextLabel=" &#62;"
              onPageChange={onPageChange}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel="&#60;"
              renderOnZeroPageCount={null}
              forcePage={currentPage - 1}
            />
          </main>
      }
    </>
  );
}
