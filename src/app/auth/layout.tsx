import { Layout } from "antd";

export default function AuthLayout({children}:{children: React.ReactNode}){
    return(
        <Layout className="bg-white">
            {children}
        </Layout>
    )
}