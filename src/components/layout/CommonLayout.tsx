import type { ReactNode } from 'react'

type CommonLayoutProps = {
	title: string
	description?: string
	children: ReactNode
}

const CommonLayout = ({ title, description, children }: CommonLayoutProps) => {
	return (
		<div className="min-h-screen">
			<div className="w-4xl mx-auto p-4">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 text-left">
						{title}
					</h1>
					{description && (
						<p className="text-gray-600 mt-2 text-left">{description}</p>
					)}
				</div>
				{children}
			</div>
		</div>
	)
}

export default CommonLayout
