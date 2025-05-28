import { useModal } from "../../../hooks/useModal";
import { useState } from "react";
import { GET_VILCOM_PACKAGES } from "../../../graphql/queries";
import { useMutation, useQuery } from '@apollo/client';
import { CreatePackageVars, CreateVilcomPackageMutation, VilcomPackage, VilcomPackageFilteringInputObject, VilcomPackageInputObject } from "../../../types/vilcomPackage";
import { Audio, BallTriangle } from 'react-loader-spinner'
import { ACTIVATE_OR_DEACTIVATE_PACKAGE, CREATE_VILCOM_PACKAGE } from "../../../graphql/mutation";
import { useToast } from "../../../components/notifications/useToast";
import PackageModal from "./packageModal";
import PackageCard from "../../../components/card/packageCard";
import ConfirmToast from "../../../components/notifications/confirmation";
import { toast } from "react-toastify";


export default function VilcomPackages() {
  const {isOpen, openModal, closeModal } = useModal();  
  const [message, setMessage] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packages, setPackages] = useState<VilcomPackage[]>([]);
  const [createPackage] = useMutation<CreateVilcomPackageMutation, CreatePackageVars>(CREATE_VILCOM_PACKAGE);
  const [deletePackage] = useMutation(ACTIVATE_OR_DEACTIVATE_PACKAGE);

  const { success,error,info } = useToast();

  const defaultFilter: VilcomPackageFilteringInputObject = {
  uuid: null,
  packageName: null,
  packageDescription: null,
};


const { loading:LoadingPackage,error:PackageError, data:PackageData } = useQuery(GET_VILCOM_PACKAGES, {
    variables: {filtering:defaultFilter}, 
    onCompleted: (data) => {
    setPackages(data?.getVilcomPackages?.data || []);
  }
  });


 const handleDelete = (uuid: string) => {
  const toastId = toast(
    <ConfirmToast
      onConfirm={async () => {
        toast.dismiss(toastId);
        try {
          const { data } = await deletePackage({ variables: { uuid } });
          const response = data?.deleteVilcomPackageMutation?.response;

          if (response?.code === 9000) {
            setPackages((prev) => prev.filter((pkg) => pkg.uuid !== uuid));
            toast.success("Package deleted successfully.");
          } else {
            toast.error(response?.message || "Failed to delete package.");
          }
        } catch (err) {
          toast.error("An error occurred while deleting.");
        }
      }}
      onCancel={() => toast.dismiss(toastId)}
    />
  );
};



  const handleSave = async () => {
    
     if (packageName == "" || message =="" ){
          info('Package Name Description is Empty')
     }

      const input: VilcomPackageInputObject = {
      uuid: null,
      packageName:packageName,
      packageDescription: message,
    };

 if(packageName && message ){
     try {

    const { data } = await createPackage({ variables: { input } });
    const responcePackageData:any = data?.createVilcomPackageMutation;
    const newPackage = data?.createVilcomPackageMutation.data;

    if (responcePackageData?.response?.code === 9000 && newPackage ) {
         success(responcePackageData.response.message);
         setPackages((prev) => [newPackage, ...prev]);
        closeModal();
    } else {
      error(responcePackageData.response.message)
    }
  } catch (err) {
        console.error("Mutation error:",err);
  }

    closeModal();
  };
 }
   

  

  if (LoadingPackage) return <Audio
  height="80"
  width="80"
  color="green"
  ariaLabel="three-dots-loading"
  wrapperStyle ={{}}
  wrapperClass = ""
/>;
  if (PackageError) return 
  <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />;


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
          gap-2 rounded-full border border-gray-300 bg-orange-500 text-white px-4 py-3 text-sm font-medium shadow-theme-xs hover:bg-orange-500 hover:text-white dark:border-gray-700 dark:bg-orange-500 dark:text-white dark:hover:bg-orange-500 dark:hover:text-white lg:inline-flex lg:w-auto"
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
          <PackageCard key={pkg.uuid} pkg={pkg} onDelete={handleDelete} />
        ))}
    </div>
     <PackageModal
      isOpen={isOpen}
      onClose={closeModal}
      packageName={packageName}
      setPackageName={setPackageName}
      message={message}
      setMessage={setMessage}
      onSave={handleSave}
      />
    </div>
  );
}
