
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';


interface Todo {
  _id: string; 
  title: string;
  description: string;
  status: string; 
}

interface TodoFormProps{
  onSubmit: (todo: Todo) => void;
  onClose: () => void; 
  initialData?: Partial<Todo>; 
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onClose, initialData  }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'pending'); 
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({  _id: initialData?._id||'',title, description,status });
    setTitle('');
    setDescription('');
    setStatus('pending')
    onClose(); // Close the form after submission
  };
const t = useTranslations('my-todo');
  return (
    <div className="flex p-4">
      <div className="bg-white p-6 shadow-md h-5/8 w-2xl rounded-lg border-t-4 border-purple-400">
      <h2 className="text-xl mb-4 ">{initialData ? `${t('update')}` : `${t('addNewTodo')}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{t("title")}</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{t("description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>{t("status")}</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  value="pending"
                  checked={status === 'pending'}
                  onChange={() => setStatus('pending')}
                  className="mr-2"
                />
                {t('pending')}
              </label>
              <label>
                <input
                  type="radio"
                  value="completed"
                  checked={status === 'completed'}
                  onChange={() => setStatus('completed')}
                  className="mr-2"
                />
                 {t('completed')}
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-600 rounded py-2 px-4 text-white"> {t('cancel')}</button>
            <button type="submit" className={`text-white px-4 py-2 rounded ${initialData ? 'bg-amber-600' : 'bg-green-600'}`}>{initialData ? `${t('update')}` : `${t('add')}`}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;