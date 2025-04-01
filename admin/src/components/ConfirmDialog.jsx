import { Button, Modal } from "@mantine/core";

const ConfirmDialog = ({ message, opened, close, handleClick }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Confirm Action"
      centered
      overlayColor="rgba(0, 0, 0, 0.5)" // Koyu renkli arka plan
      overlayOpacity={0.8} // Opaklık ekleyerek daha odaklanılabilir bir görünüm
      overlayBlur={3} // Arka planı biraz daha bulanıklaştırmak
      withCloseButton={false} // Kapatma butonunu gizledik, çünkü zaten pencereyi kapatma var
      classNames={{
        modal: "rounded-lg", // Köşeleri yuvarlak yapmak
        title: "text-xl font-semibold text-center text-gray-700", // Başlık stilini özelleştirmek
      }}
    >
      <p className="text-lg text-center text-gray-600">{message}</p>

      <div className="w-full flex gap-6 justify-center mt-8">
        <Button
          className="bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-300"
          onClick={handleClick}
        >
          OK
        </Button>
        <Button
          className="border border-slate-300 text-slate-600 text-sm py-2 px-4 rounded-md hover:bg-slate-100 transition-all duration-300"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
