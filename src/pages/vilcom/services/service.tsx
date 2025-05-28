import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import TextArea from "../../../components/form/input/TextArea";
import { useState } from "react";
import { GET_VILCOM_SERVICES } from "../../../graphql/queries";
import { useQuery } from '@apollo/client';
import { VilcomService, VilcomServiceFilteringInputObject } from "../../../types/vilcomServices";
import { ColorRing } from "react-loader-spinner";


export default function VilcomServices() {
  const {isOpen, openModal, closeModal } = useModal();  
  const [message, setMessage] = useState("");
  
  const handleSave = () => {
    // Handle save logic here
    closeModal();
  };

  const defaultFilter:VilcomServiceFilteringInputObject  = {
  uuid: null,
  serviceName: null,
};

  const { loading, error, data } = useQuery(
    GET_VILCOM_SERVICES,{
    variables: {
       filtering:defaultFilter 
      }, 
  });

  if (loading) return <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />;
  if (error) return <p>Error loading packages: {error.message}</p>;

  const packages: VilcomService[] = data?.getVilcomServices?.data || [];

  return (

    <div className="p-2 border border-gray-200  rounded-xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Package Information
          </h2>
        </div>

        <button
          onClick={openModal}
          className="
          flex 
          w-full 
          items-center 
          justify-center 
          gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2C9.27614 2 9.5 2.22386 9.5 2.5V8.5H15.5C15.7761 8.5 16 8.72386 16 9C16 9.27614 15.7761 9.5 15.5 9.5H9.5V15.5C9.5 15.7761 9.27614 16 9 16C8.72386 16 8.5 15.7761 8.5 15.5V9.5H2.5C2.22386 9.5 2 9.27614 2 9C2 8.72386 2.22386 8.5 2.5 8.5H8.5V2.5C8.5 2.22386 8.72386 2 9 2Z"
              fill=""
              className="font"
            />
          </svg>
          Add
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {packages.map((pkg) => (
      <div
          key={pkg.uuid}
          className="rounded-lg border p-4 shadow-sm"
        >
          <h3 className="text-lg dark:text-white/90 font-bold text-gray-800">
            {pkg.serviceName}
          </h3>
          <p className="text-sm dark:text-white/90  text-gray-600">
            {pkg.serviceDescription}
          </p>
          {pkg.servicePhoto && (
            <img
              src={pkg.servicePhoto}
              alt={pkg.servicePhoto}
              className="mt-2 dark:text-white/90 h-32 w-full object-cover rounded-md"
            />
          )}
          <p className={`mt-2 text-xs ${pkg.isActive ? 'text-green-600' : 'text-red-600'}`}>
            {pkg.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
      ))}
    </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
              Add Service
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Package Name</Label>
                    <Input type="text" name="" />
                  </div>
                  <div className="col-span-2">
                  <Label>Package Description</Label>
                  <TextArea
                    value={message}
                    onChange={(value) => setMessage(value)}
                    rows={2}
                  />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-500" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
