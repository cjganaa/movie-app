import { Film, Mail , Phone } from 'lucide-react';
export function Footer(){
    return(
        <footer className="relative bottom-0 left-0 right-0 h-[308px] bg-indigo-700 flex justify-center items-center text-[#FAFAFA] text-sm">
          <div className="w-5/6 grid grid-cols-4 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:w-9/10">
            <div className="col-span-4 flex flex-col justify-end sm:col-span-1 sm:row-span-2 sm:justify-start lg:col-span-2 xl:col-span-4">
              <div className="flex gap-2 font-bold italic"><Film strokeWidth={1}/>Movie Z </div>
              <div>© 2024 Movie Z. All Rights Reserved.</div>
            </div>
            <div className="col-span-3 sm:col-span-1">
              <div>Contact Information</div>
            </div>
            <div>Follow us</div>
            <div className="col-span-3 flex flex-col gap-5 sm:col-span-1">
              <div className="flex gap-3">
                <div className="flex items-center"><Mail size={16}/></div>
                <div>
                  <div className="font-medium">Email:</div>
                  <div>support@movieZ.com</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center"><Phone size={16}/></div>
                <div>
                  <div className="font-medium">Phone:</div>
                  <div>+976 (11) 123-4567</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div>Facebook</div>
              <div>Instagram</div>
              <div>Twitter</div>
              <div>Youtube</div>
            </div>
            
            
          </div>
        </footer>
    );
}