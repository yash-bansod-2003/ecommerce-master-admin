import {
      AlertTriangle,
      ArrowRight,
      Check,
      ChevronLeft,
      ChevronRight,
      Command,
      CreditCard,
      File,
      HelpCircle,
      Image,
      Loader2,
      LucideProps,
      Moon,
      MoreVertical,
      Plus,
      Settings,
      SunMedium,
      Trash,
      User,
      X,
      Palette,
      type LucideIcon,
      Ruler,
      Box,
      PlusCircle,
      Store,
      Laptop,
      Copy,
      CopyCheck,
      MoreHorizontal,
      Pencil,
      Trash2,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
      logo: Command,
      close: X,
      spinner: Loader2,
      chevronLeft: ChevronLeft,
      chevronRight: ChevronRight,
      trash: Trash2,
      page: File,
      media: Image,
      settings: Settings,
      billing: CreditCard,
      ellipsis: MoreVertical,
      add: Plus,
      warning: AlertTriangle,
      user: User,
      arrowRight: ArrowRight,
      help: HelpCircle,
      sun: SunMedium,
      moon: Moon,
      palette: Palette,
      size: Ruler,
      product: Box,
      plusCircle: PlusCircle,
      gitHub: ({ ...props }: LucideProps) => (
            <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  {...props}
            >
                  <path
                        fill="currentColor"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
            </svg>
      ),
      caretSort: ({ ...props }: LucideProps) => (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}> <path fillRule="evenodd" clipRule="evenodd" d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" /> </svg>
      ),
      check: Check,
      store: Store,
      laptop: Laptop,
      copy: Copy,
      copyCheck: CopyCheck,
      more: MoreHorizontal,
      edit: Pencil,
      noData: ({ ...props }: LucideProps) => (
            <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="184"
                  height="152"
                  viewBox="0 0 184 152"
                  {...props}
            >
                  <g fill="none" fillRule="evenodd">
                        <g transform="translate(24 31.67)">
                              <ellipse
                                    cx="67.797"
                                    cy="106.89"
                                    fill="#F5F5F7"
                                    fillOpacity="0.8"
                                    rx="67.797"
                                    ry="12.668"
                              ></ellipse>
                              <path
                                    fill="#AEB8C2"
                                    d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                              ></path>
                              <path
                                    fill="url(#linearGradient-1)"
                                    d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z"
                                    transform="translate(13.56)"
                              ></path>
                              <path
                                    fill="#F5F5F7"
                                    d="M33.83 0h67.933a4 4 0 014 4v93.344a4 4 0 01-4 4H33.83a4 4 0 01-4-4V4a4 4 0 014-4z"
                              ></path>
                              <path
                                    fill="#DCE0E6"
                                    d="M42.678 9.953h50.237a2 2 0 012 2V36.91a2 2 0 01-2 2H42.678a2 2 0 01-2-2V11.953a2 2 0 012-2zm.262 39.814h49.713a2.262 2.262 0 110 4.524H42.94a2.262 2.262 0 010-4.524zm0 11.763h49.713a2.262 2.262 0 110 4.525H42.94a2.262 2.262 0 010-4.525zm78.873 43.502c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 01-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569a7.33 7.33 0 01-.221 1.789z"
                              ></path>
                        </g>
                        <path
                              fill="#DCE0E6"
                              d="M149.121 33.292l-6.83 2.65a1 1 0 01-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                        ></path>
                        <g fill="#FFF" transform="translate(149.65 15.383)">
                              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse>
                              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path>
                        </g>
                  </g>
            </svg>
      )
}